"use client";
import React, { useState } from "react";
import { BUCKET_DEPOSIT, BUCKET_PROTOCOL, BUCKET_WITHDRAW, FLASK, FOUNTAIN } from "@/data/bucket";
import { CONFIG_ID, PACKAGE_ID } from "@/data/stingray";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Segmented,
  Select,
  Typography,
} from "antd";
import {
  ConnectButton,
  useCurrentAccount,
  useCurrentWallet,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "@mysten/sui/transactions";
import { CloseOutlined } from "@ant-design/icons";

type PtbLast = {
  package: string;
  module: string;
  function: string;
  arguments: { type: string; value: string }[];
  types: string[];
};


type BucketDepositInfo = {
    name: string, 
    inputType: string,
    inputAmount: number,
    inputDecimal: number,
    outputType: string,
};

type BucketWithdrawInfo = {
    name: string,
    inputType: string,
    outputType1: string,
    outputType2: string,

};

type InvestTarget = {
    fund: string,
    trader: string,
    fundType: string,
}


const page = () => {

  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction({
      onError: (error) => {
        console.error(error);
      },
    });

  const getArgument = ({
    ptbIndex,
    type,
    value,
    tx,
  }: {
    ptbIndex: number;
    type: string;
    value: string | PtbLast;
    tx: Transaction;
  }): any => {
    if (type === "move call") {
      const ptb = value as PtbLast;
      return tx.moveCall({
        package: ptb.package,
        module: ptb.module,
        function: ptb.function,
        arguments: ptb.arguments.map((arg) =>
          getArgument({
            ptbIndex,
            type: arg.type,
            value: arg.value,
            tx,
          })
        ),
        typeArguments: ptb.types,
      });
    }

    const valueString = value as string;
    if (type === "u64") {
      return tx.pure.u64(Number(value));
    } else if (type === "u8") {
      return tx.pure.u8(Number(value));
    } else if (type === "object") {
      return tx.object(valueString);
    } else if (type === "string") {
      return tx.pure.string(valueString);
    } else if (type === "bool") {
      return tx.pure.bool(value === "true");
    } else if (type === "gas") {
      return tx.splitCoins(tx.gas, [Number(value) * 10 ** 10]);
    }
    return tx.object(valueString);
  };

  const { mutate:deposit } = useMutation({
    mutationFn: async (info: {target: InvestTarget, bucketDepositInfo: BucketDepositInfo}) => {
      const tx = new Transaction();
      
      const [takeAsset, takeRequest] = tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "take_1_liquidity_for_1_nonliquidity",
        arguments: [ tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(info.target.trader),
          tx.pure.u64(info.bucketDepositInfo.inputAmount * info.bucketDepositInfo.inputDecimal),
          tx.object("0x6"),
        ],
        typeArguments: [info.bucketDepositInfo.inputType, info.bucketDepositInfo.outputType, info.target.fundType],
      });

      const proof = tx.moveCall({
        package: PACKAGE_ID,
        module: "bucket",
        function: "deposit",
        arguments:[
          tx.object(takeRequest),
          takeAsset,
          tx.object(BUCKET_PROTOCOL),
          tx.object(FLASK),
          tx.object(FOUNTAIN),
          tx.object("0x6")
        ],
      });

      tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "put_1_liquidity_for_1_nonliquidity",
        arguments:[
          tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(takeRequest),
          proof,
        ],
        typeArguments: [info.bucketDepositInfo.inputType, info.bucketDepositInfo.outputType, info.target.fundType],
      });

      console.log(tx);
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      console.log(result);
      return result;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate:withdraw } = useMutation({
    mutationFn: async (info: {target: InvestTarget, bucketWithdrawInfo: BucketWithdrawInfo}) => {
      const tx = new Transaction();
      
      const [takeAsset, takeRequest] = tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "take_1_nonliquidity_for_2_liquidity",
        arguments: [ tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(info.target.trader),
          tx.object("0x6"),
        ],
        typeArguments: [info.bucketWithdrawInfo.inputType, info.bucketWithdrawInfo.outputType1, info.bucketWithdrawInfo.outputType2,info.target.fundType],
      });

      const [outputAsset1, outputAsset2] = tx.moveCall({
        package: PACKAGE_ID,
        module: "bucket",
        function: "withdraw",
        arguments:[
          tx.object(takeRequest),
          takeAsset,
          tx.object(BUCKET_PROTOCOL),
          tx.object(FLASK),
          tx.object(FOUNTAIN),
          tx.object("0x6")
        ],
      });

      tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "put_1_nonliquidity_for_2_liquidity",
        arguments:[
          tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(takeRequest),
          outputAsset1,
          outputAsset2
        ],
        typeArguments: [info.bucketWithdrawInfo.inputType, info.bucketWithdrawInfo.outputType1, info.bucketWithdrawInfo.outputType2,info.target.fundType],
      });

      console.log(tx);
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      console.log(result);
      return result;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Flex
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        gap: "1rem",
        margin: "0 auto",
        marginTop: "2rem",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          width: "100%",
        }}
      >
        <Typography.Title level={3}>PTB</Typography.Title>
        <ConnectButton />
      </Flex>
      <Button
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
        onClick={() => {

          const targetInfo: InvestTarget = {
            fund: "0xd35254ff2e14011216bb9d39ff5263d10317fe9043f23ac37dd72cf57298b385",
            fundType: "0x2::sui::SUI",
            trader: "0x45f9a8a08deced0ffaf82e1fd9eeba56f24726eb1fe6732c0ac8f69ca0d81ea3",
          };

          const param= {target:  targetInfo, bucketDepositInfo: BUCKET_DEPOSIT[0]};
          deposit(param);
        }}
      >
        Deposit
      </Button>
      <Button
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
        onClick={() => {

          const targetInfo: InvestTarget = {
            fund: "0xd35254ff2e14011216bb9d39ff5263d10317fe9043f23ac37dd72cf57298b385",
            fundType: "0x2::sui::SUI",
            trader: "0x45f9a8a08deced0ffaf82e1fd9eeba56f24726eb1fe6732c0ac8f69ca0d81ea3",
          };

          const param= {target:  targetInfo, bucketWithdrawInfo: BUCKET_WITHDRAW[0]};
          withdraw(param);
        }}
      >
        Withdraw
      </Button>
        
    </Flex>
  );
};

export default page;

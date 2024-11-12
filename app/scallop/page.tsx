"use client";
import React, { useState } from "react";
import { SCALLOP_DEPOSIT, SCALLOP_WITHDRAW, SCALLOP_MARKET, SCALLOP_VERSION } from "@/data/scallop";
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


type ScallopDepositInfo = {
    name: string, 
    inputType: string,
    inputAmount: number,
    inputDecimal: number,
    outputType: string,
};

type ScallopWithdrawInfo = {
    name: string,
    inputType: string,
    outputType: string,
    inputAmount: number,
    inputDecimal: number,
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
    mutationFn: async (info: {target: InvestTarget, scallopDepositInfo: ScallopDepositInfo}) => {
      const tx = new Transaction();
      
      const [takeAsset, takeRequest] = tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "take_1_liquidity_for_1_liquidity",
        arguments: [ tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(info.target.trader),
          tx.pure.u64(info.scallopDepositInfo.inputAmount * info.scallopDepositInfo.inputDecimal),
          tx.object("0x6"),
        ],
        typeArguments: [info.scallopDepositInfo.inputType, info.scallopDepositInfo.outputType, info.target.fundType],
      });

      const deposit_coin = tx.moveCall({
          package: "0x2",
          module: "coin",
          function: "from_balance",
          arguments: [ takeAsset ],
          typeArguments: [info.scallopDepositInfo.inputType],
      });

      const proof_coin = tx.moveCall({
        package: PACKAGE_ID,
        module: "scallop",
        function: "deposit",
        arguments:[
          tx.object(takeRequest),
          deposit_coin,
          tx.object(SCALLOP_VERSION),
          tx.object(SCALLOP_MARKET),
          tx.object("0x6")
        ],
        typeArguments: [info.scallopDepositInfo.inputType],
      });

      const put_balance = tx.moveCall({
        package: "0x2",
        module: "coin",
        function: "into_balance",
        arguments: [ proof_coin ],
        typeArguments: [info.scallopDepositInfo.outputType],
      });

      tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "put_1_liquidity_for_1_liquidity",
        arguments:[
          tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(takeRequest),
          put_balance,
        ],
        typeArguments: [info.scallopDepositInfo.inputType, info.scallopDepositInfo.outputType, info.target.fundType],
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
    mutationFn: async (info: {target: InvestTarget, scallopWithdrawInfo: ScallopWithdrawInfo}) => {
      const tx = new Transaction();
      
      const [takeAsset, takeRequest] = tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "take_1_liquidity_for_1_liquidity",
        arguments: [ tx.object(CONFIG_ID),
            tx.object(info.target.fund),
            tx.object(info.target.trader),
            tx.pure.u64(info.scallopWithdrawInfo.inputAmount * info.scallopWithdrawInfo.inputDecimal),
            tx.object("0x6"),
        ],
        typeArguments: [info.scallopWithdrawInfo.inputType, info.scallopWithdrawInfo.outputType, info.target.fundType],
      });

      const proof_coin = tx.moveCall({
        package: "0x2",
        module: "coin",
        function: "from_balance",
        arguments: [ takeAsset ],
        typeArguments: [info.scallopWithdrawInfo.inputType],
    });
      const outputAsset = tx.moveCall({
        package: PACKAGE_ID,
        module: "scallop",
        function: "withdraw",
        arguments:[
          tx.object(takeRequest),
          proof_coin,
          tx.object(SCALLOP_VERSION),
          tx.object(SCALLOP_MARKET),
          tx.object("0x6")
        ],
      typeArguments: [info.scallopWithdrawInfo.outputType],
      });

      const put_balance = tx.moveCall({
        package: "0x2",
        module: "coin",
        function: "into_balance",
        arguments: [ outputAsset ],
        typeArguments: [info.scallopWithdrawInfo.outputType],
      });

      tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "put_1_liquidity_for_1_liquidity",
        arguments:[
          tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(takeRequest),
          put_balance,
        ],
        typeArguments: [info.scallopWithdrawInfo.inputType, info.scallopWithdrawInfo.outputType,info.target.fundType],
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

          const param= {target:  targetInfo, scallopDepositInfo: SCALLOP_DEPOSIT[7]};
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

          const param= {target:  targetInfo, scallopWithdrawInfo: SCALLOP_WITHDRAW[7]};
          withdraw(param);
        }}
      >
        Withdraw
      </Button>
        
    </Flex>
  );
};

export default page;

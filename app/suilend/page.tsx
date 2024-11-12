"use client";
import React, { useState } from "react";
import { SUILEND_DEPOSIT, SUILEND_WITHDRAW, SUILEND_LENDING_MARKET, SUILEND_RESERVE_MAP, SUILEND_PLATFORM_TYPE } from "@/data/suilend";
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


type SuilendDepositInfo = {
    name: string, 
    reserveIdx: number,
    inputType: string,
    inputAmount: number,
    inputDecimal: number,
    outputType: string,
};

type SuilendWithdrawInfo = {
    name: string,
    reserveIdx: number,
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
    mutationFn: async (info: {target: InvestTarget, suilendDepositInfo: SuilendDepositInfo}) => {
      const tx = new Transaction();
      
      const [takeAsset, takeRequest] = tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "take_1_liquidity_for_1_liquidity",
        arguments: [ tx.object(CONFIG_ID),
          tx.object(info.target.fund),
          tx.object(info.target.trader),
          tx.pure.u64(info.suilendDepositInfo.inputAmount * info.suilendDepositInfo.inputDecimal),
          tx.object("0x6"),
        ],
        typeArguments: [info.suilendDepositInfo.inputType, info.suilendDepositInfo.outputType, info.target.fundType],
      });

      const deposit_coin = tx.moveCall({
          package: "0x2",
          module: "coin",
          function: "from_balance",
          arguments: [ takeAsset ],
          typeArguments: [info.suilendDepositInfo.inputType],
      });

      const proof_coin = tx.moveCall({
        package: PACKAGE_ID,
        module: "suilend",
        function: "deposit",
        arguments:[
          tx.object(takeRequest),
          deposit_coin,
          tx.object(SUILEND_LENDING_MARKET),
          tx.pure.u64(info.suilendDepositInfo.reserveIdx),
          tx.object("0x6")
        ],
        typeArguments: [SUILEND_PLATFORM_TYPE, info.suilendDepositInfo.inputType],
      });

      const put_balance = tx.moveCall({
        package: "0x2",
        module: "coin",
        function: "into_balance",
        arguments: [ proof_coin ],
        typeArguments: [info.suilendDepositInfo.outputType],
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
        typeArguments: [info.suilendDepositInfo.inputType, info.suilendDepositInfo.outputType, info.target.fundType],
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
    mutationFn: async (info: {target: InvestTarget, suilendWithdrawInfo: SuilendWithdrawInfo}) => {
      const tx = new Transaction();
      
      const [takeAsset, takeRequest] = tx.moveCall({
        package: PACKAGE_ID,
        module: "fund",
        function: "take_1_liquidity_for_1_liquidity",
        arguments: [ tx.object(CONFIG_ID),
            tx.object(info.target.fund),
            tx.object(info.target.trader),
            tx.pure.u64(info.suilendWithdrawInfo.inputAmount * info.suilendWithdrawInfo.inputDecimal),
            tx.object("0x6"),
        ],
        typeArguments: [info.suilendWithdrawInfo.inputType, info.suilendWithdrawInfo.outputType, info.target.fundType],
      });

      const proof_coin = tx.moveCall({
        package: "0x2",
        module: "coin",
        function: "from_balance",
        arguments: [ takeAsset ],
        typeArguments: [info.suilendWithdrawInfo.inputType],
    });
      const outputAsset = tx.moveCall({
        package: PACKAGE_ID,
        module: "suilend",
        function: "withdraw",
        arguments:[
          tx.object(takeRequest),
          proof_coin,
          tx.object(SUILEND_LENDING_MARKET),
          tx.pure.u64(info.suilendWithdrawInfo.reserveIdx),
          tx.object("0x6")
        ],
      typeArguments: [SUILEND_PLATFORM_TYPE, info.suilendWithdrawInfo.outputType],
      });

      const put_balance = tx.moveCall({
        package: "0x2",
        module: "coin",
        function: "into_balance",
        arguments: [ outputAsset ],
        typeArguments: [info.suilendWithdrawInfo.outputType],
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
        typeArguments: [info.suilendWithdrawInfo.inputType, info.suilendWithdrawInfo.outputType,info.target.fundType],
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

          const param= {target:  targetInfo, suilendDepositInfo: SUILEND_DEPOSIT[4]};
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

          const param= {target:  targetInfo, suilendWithdrawInfo: SUILEND_WITHDRAW[4]};
          withdraw(param);
        }}
      >
        Withdraw
      </Button>
        
    </Flex>
  );
};

export default page;

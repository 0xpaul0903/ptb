"use client";
import React, { useState } from "react";
import { CETUS_CONFIG, CETUS_SWAP } from "../../data/cetus";
import { CONFIG_ID, PACKAGE_ID } from "../../data/stingray";

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


type SwapInfo = {
  name: string,
  firstToken:{
    type: string,
    decimal: number,
    amount: number,
  },
  secondToken:{
    type: string,
    decimal: number,
    amount: number,
  },
  pool: string,
  poolFirstType: string,
  poolSecondType: string,
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

  const { mutate } = useMutation({
    mutationFn: async (info: {target: InvestTarget, swapInfo: SwapInfo}) => {
      const tx = new Transaction();

      if (info.swapInfo.firstToken.amount ==0){
        const [secondAsset, takeRequest] = tx.moveCall({
          package: PACKAGE_ID,
          module: "fund",
          function: "take_1_liquidity_for_1_liquidity",
          arguments: [ tx.object(CONFIG_ID),
            tx.object(info.target.fund),
            tx.object(info.target.trader),
            tx.pure.u64(info.swapInfo.secondToken.amount * info.swapInfo.secondToken.decimal),
            tx.object("0x6"),
          ],
          typeArguments: [info.swapInfo.secondToken.type, info.swapInfo.firstToken.type, info.target.fundType],
        });

        const firstAsset = tx.moveCall({
          package: PACKAGE_ID,
          module: "cetus",
          function: "take_zero_balance",
          typeArguments: [info.swapInfo.firstToken.type],
        });

        tx.moveCall({
          package: PACKAGE_ID,
          module: "cetus",
          function: "swap",
          arguments:[
            tx.object(takeRequest),
            firstAsset,
            secondAsset,
            tx.object(CETUS_CONFIG),
            tx.object(info.swapInfo.pool),
            tx.pure.bool(false),
            tx.pure.bool(true),
            tx.object("0x6")
          ],
          typeArguments: [info.swapInfo.secondToken.type,info.swapInfo.firstToken.type,info.swapInfo.poolFirstType,info.swapInfo.poolSecondType],
        });

        tx.moveCall({
          package: PACKAGE_ID,
          module: "fund",
          function: "put_1_liquidity_for_1_liquidity",
          arguments:[
            tx.object(CONFIG_ID),
            tx.object(info.target.fund),
            tx.object(takeRequest),
            firstAsset,
          ],
          typeArguments: [info.swapInfo.secondToken.type, info.swapInfo.firstToken.type, info.target.fundType],
        });

        tx.moveCall({
          package: PACKAGE_ID,
          module: "cetus",
          function: "drop_zero_balance",
          arguments:[
            secondAsset
          ],
          typeArguments: [info.swapInfo.secondToken.type],
        });

      }else{ //info.swapInfo.firstToken.amount == 0

        const [firstAsset, takeRequest] = tx.moveCall({
          package: PACKAGE_ID,
          module: "fund",
          function: "take_1_liquidity_for_1_liquidity",
          arguments: [ tx.object(CONFIG_ID),
            tx.object(info.target.fund),
            tx.object(info.target.trader),
            tx.pure.u64(info.swapInfo.firstToken.amount * info.swapInfo.firstToken.decimal),
            tx.object("0x6"),
          ],
          typeArguments: [info.swapInfo.firstToken.type, info.swapInfo.secondToken.type, info.target.fundType],
        });

        const secondAsset = tx.moveCall({
          package: PACKAGE_ID,
          module: "cetus",
          function: "take_zero_balance",
          typeArguments: [info.swapInfo.secondToken.type],
        });
        console.log(secondAsset);
        tx.moveCall({
          package: PACKAGE_ID,
          module: "cetus",
          function: "swap",
          arguments:[
            tx.object(takeRequest),
            firstAsset,
            secondAsset,
            tx.object(CETUS_CONFIG),
            tx.object(info.swapInfo.pool),
            tx.pure.bool(true),
            tx.pure.bool(true),
            tx.object("0x6")
          ],
          typeArguments: [info.swapInfo.firstToken.type,info.swapInfo.secondToken.type,info.swapInfo.poolFirstType,info.swapInfo.poolSecondType],
        });

        tx.moveCall({
          package: PACKAGE_ID,
          module: "fund",
          function: "put_1_liquidity_for_1_liquidity",
          arguments:[
            tx.object(CONFIG_ID),
            tx.object(info.target.fund),
            tx.object(takeRequest),
            secondAsset,
          ],
          typeArguments: [info.swapInfo.firstToken.type, info.swapInfo.secondToken.type, info.target.fundType],
        });

        tx.moveCall({
          package: PACKAGE_ID,
          module: "cetus",
          function: "drop_zero_balance",
          arguments:[
            firstAsset
          ],
          typeArguments: [info.swapInfo.firstToken.type],
        });
      }

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

          const param= {target:  targetInfo, swapInfo: CETUS_SWAP[11]};
          mutate(param);
        }}
      >
        Swap
      </Button>
        
    </Flex>
  );
};

export default page;

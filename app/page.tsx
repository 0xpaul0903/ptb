"use client";
import React, { useState } from "react";

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

type Ptb = {
  package: string;
  module: string;
  function: string;
  arguments: {
    type: string;
    value: string | PtbLast;
  }[];
  types: string[];
};

const MoveCallModal = ({
  argIndex,
  ptbIndex,
}: {
  argIndex: number;
  ptbIndex: number;
}) => {
  const [isOpen, setMoveCallOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  console.log(argIndex, ptbIndex);
  return (
    <>
      <Button
        style={{
          border: confirmed ? "1px solid green" : "1px solid #ccc",
          color: confirmed ? "green" : "#ccc",
        }}
        onClick={() => {
          setMoveCallOpen(true);
        }}
      >
        Move Call
      </Button>
      {(isOpen || !confirmed) && (
        <Flex
          style={{
            display: isOpen ? "flex" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 100,
          }}
        >
          <Flex
            style={{
              padding: "1rem",
              backgroundColor: "rgba(0,0,0)",
              width: "600px",
            }}
            vertical
            gap="1rem"
          >
            <Typography.Title level={5}>Move Call</Typography.Title>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>Package</Typography.Title>
              <Form.Item name={[argIndex, "package"]} layout="vertical">
                <Input placeholder="package" />
              </Form.Item>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>module</Typography.Title>
              <Form.Item name={[argIndex, "module"]} layout="vertical">
                <Input placeholder="module" />
              </Form.Item>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>function</Typography.Title>
              <Form.Item name={[argIndex, "function"]} layout="vertical">
                <Input placeholder="function" />
              </Form.Item>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>Arguments</Typography.Title>
              <Form.List name={[argIndex, "arguments"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }, i) => (
                      <Flex gap="small" key={i}>
                        <Form.Item
                          name={[name, "value"]}
                          style={{
                            marginBottom: 0,
                            width: "100%",
                          }}
                        >
                          <Input placeholder="value" />
                        </Form.Item>
                        <Form.Item
                          name={[name, "type"]}
                          style={{
                            marginBottom: 0,
                            minWidth: "100px",
                          }}
                        >
                          <Select placeholder="type">
                            <Select.Option value="string">string</Select.Option>
                            <Select.Option value="object">object</Select.Option>
                            <Select.Option value="u64">u64</Select.Option>
                            <Select.Option value="u8">u8</Select.Option>
                            <Select.Option value="bool">bool</Select.Option>
                            <Select.Option value="gas">gas</Select.Option>
                          </Select>
                        </Form.Item>
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          <CloseOutlined />
                        </Button>
                      </Flex>
                    ))}
                    <Button
                      onClick={() => {
                        add();
                      }}
                    >
                      Add Argument
                    </Button>
                  </>
                )}
              </Form.List>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>Types</Typography.Title>
              <Form.List name={[argIndex, "types"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Flex
                        key={key}
                        style={{
                          gap: "1rem",
                          width: "100%",
                        }}
                      >
                        <Form.Item
                          name={name}
                          style={{
                            marginBottom: 0,
                            gap: "1rem",
                            width: "100%",
                          }}
                        >
                          <Input
                            placeholder="type"
                            style={{
                              width: "100%",
                            }}
                          />
                        </Form.Item>
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          <CloseOutlined />
                        </Button>
                      </Flex>
                    ))}
                    <Button
                      onClick={() => {
                        add();
                      }}
                    >
                      Add types
                    </Button>
                  </>
                )}
              </Form.List>
            </Flex>
            <Flex gap="middle">
              <Button
                type="primary"
                onClick={() => {
                  setMoveCallOpen(false);
                  setConfirmed(true);
                }}
              >
                Confirm
              </Button>
              <Button
                onClick={() => {
                  setMoveCallOpen(false);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

const page = () => {
  const suiClient = useSuiClient();
  const [ptbNumber, setPtbNumber] = useState(1);
  const [moveCallOpen, setMoveCallOpen] = useState(false);
  const wallet = useCurrentWallet();

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
    mutationFn: async (ptbs: Ptb[]) => {
      const tx = new Transaction();
      const [sui_coin, take_request] = tx.moveCall({
          package: "0xee68e1b93ee52fb9d02264b2bc5ada360336250d6e98e43bf5cc687fc231d1c4",
          module: "fund",
          function: "take_1_liquidity_for_2_liquidity",
          arguments: [ tx.object("0x126fcbd74ee0e2442a16e6c945abeb193fb66fcad30fa5469dab00e401743534"),
            tx.object("0x91e8051810ceddff4f0f80e83229d4079e65a0ab6d805c80d0c20011814fe56b"),
            tx.object("0x722cac08254e8086268f68cee54cc6515849938805978ede72b0c74192d25387"),
            tx.pure.u64(10000000),
          ],
          typeArguments: ["0x2::sui::SUI","0x2::sui::SUI","0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP","0x2::sui::SUI"],
      });
      const deep_coin = tx.moveCall({
        package: "0xee68e1b93ee52fb9d02264b2bc5ada360336250d6e98e43bf5cc687fc231d1c4",
        module: "cetus",
        function: "take_zero_balance",
        typeArguments: ["0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP"],
      });
      tx.moveCall({
        package: "0xee68e1b93ee52fb9d02264b2bc5ada360336250d6e98e43bf5cc687fc231d1c4",
        module: "cetus",
        function: "swap",
        arguments:[
          tx.object(take_request),
          deep_coin,
          sui_coin,
          tx.object("0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f"),
          tx.object("0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2"),
          tx.pure.bool(false),
          tx.pure.bool(false),
          tx.object("0x6")
        ],
        typeArguments: ["0x2::sui::SUI","0x2::sui::SUI","0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP","0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP","0x2::sui::SUI"],
      });
      tx.moveCall({
        package: "0xee68e1b93ee52fb9d02264b2bc5ada360336250d6e98e43bf5cc687fc231d1c4",
        module: "fund",
        function: "put_1_liquidity_for_2_liqudity",
        arguments:[
          tx.object("0x126fcbd74ee0e2442a16e6c945abeb193fb66fcad30fa5469dab00e401743534"),
          tx.object("0x91e8051810ceddff4f0f80e83229d4079e65a0ab6d805c80d0c20011814fe56b"),
          tx.object(take_request),
          sui_coin,
          deep_coin,
        ],
        typeArguments: ["0x2::sui::SUI","0x2::sui::SUI","0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP","0x2::sui::SUI"],
      });

      console.log(ptbs);
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
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
        onFinish={(value) => {
          mutate();
        }}
      >
        {Array.from(Array(ptbNumber))?.map((_, i) => (
          <Flex
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
            }}
            vertical
            gap="1rem"
          >
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>Package</Typography.Title>
              <Form.Item name={`package-${i}`} layout="vertical">
                <Input placeholder="package" />
              </Form.Item>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>module</Typography.Title>
              <Form.Item name={`module-${i}`} layout="vertical">
                <Input placeholder="module" />
              </Form.Item>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>function</Typography.Title>
              <Form.Item name={`function-${i}`} layout="vertical">
                <Input placeholder="function" />
              </Form.Item>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>Arguments</Typography.Title>
              <Form.List name={`arguments-${i}`}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }, j) => (
                      <Flex gap="small" key={i}>
                        <Form.Item
                          name={[name, "value"]}
                          style={{
                            marginBottom: 0,
                            width: "100%",
                          }}
                        >
                          <Input placeholder="value" />
                        </Form.Item>
                        <Form.Item
                          name={[name, "type"]}
                          style={{
                            marginBottom: 0,
                            minWidth: "100px",
                          }}
                        >
                          <Select placeholder="type">
                            <Select.Option value="string">string</Select.Option>
                            <Select.Option value="object">object</Select.Option>
                            <Select.Option value="u64">u64</Select.Option>
                            <Select.Option value="u8">u8</Select.Option>
                            <Select.Option value="bool">bool</Select.Option>
                            <Select.Option value="gas">gas</Select.Option>
                          </Select>
                        </Form.Item>

                        <MoveCallModal argIndex={j} ptbIndex={i} />
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          <CloseOutlined />
                        </Button>
                      </Flex>
                    ))}
                    <Button
                      onClick={() => {
                        add();
                      }}
                    >
                      Add Argument
                    </Button>
                  </>
                )}
              </Form.List>
            </Flex>
            <Flex
              style={{
                flexDirection: "column",
              }}
              gap="small"
            >
              <Typography.Title level={5}>Types</Typography.Title>
              <Form.List name={`types-${i}`}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => (
                      <Flex
                        key={key}
                        style={{
                          gap: "1rem",
                          width: "100%",
                        }}
                      >
                        <Form.Item
                          name={name}
                          style={{
                            marginBottom: 0,
                            gap: "1rem",
                            width: "100%",
                          }}
                        >
                          <Input
                            placeholder="type"
                            style={{
                              width: "100%",
                            }}
                          />
                        </Form.Item>
                        <Button
                          onClick={() => {
                            remove(name);
                          }}
                        >
                          <CloseOutlined />
                        </Button>
                      </Flex>
                    ))}
                    <Button
                      onClick={() => {
                        add();
                      }}
                    >
                      Add types
                    </Button>
                  </>
                )}
              </Form.List>
            </Flex>
          </Flex>
        ))}
        <Button
          onClick={() => {
            setPtbNumber(ptbNumber + 1);
          }}
        >
          Add ptbs
        </Button>
          <Button type="primary" htmlType="submit" >
            Run
          </Button>
      </Form>
    </Flex>
  );
};

export default page;

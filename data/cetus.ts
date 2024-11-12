export const CETUS_CONFIG = "0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f";

export const CETUS_SWAP = [
    { // 0: DEEP
        name: "DEEP",
        firstToken:{
          type: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
          decimal: 1000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2",
        poolFirstType: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
        poolSecondType: "0x2::sui::SUI",
    },{ // 1: BCUK
        name: "BUCK",
        firstToken:{
          type: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
          decimal: 1000000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x59cf0d333464ad29443d92bfd2ddfd1f794c5830141a5ee4a815d1ef3395bf6c",
        poolFirstType: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
        poolSecondType: "0x2::sui::SUI",
    },{ // 2: USDC
        name: "USDC",
        firstToken:{
          type: "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
          decimal: 1000000,
          amount: 0.01,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105",
        poolFirstType: "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
        poolSecondType: "0x2::sui::SUI",
    },{ // 3: SCA
        name: "SCA",
        firstToken:{
          type: "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
          decimal: 1000000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xaa72bd551b25715b8f9d72f226fa02526bdf2e085a86faec7184230c5209bb6e",
        poolFirstType: "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
        poolSecondType: "0x2::sui::SUI",
    },{ // 4: BLUE
        name: "BLUE",
        firstToken:{
          type: "0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB",
          decimal: 100,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x40a372f9ee1989d76ceb8e50941b04468f8551d091fb8a5d7211522e42e60aaf",
        poolFirstType: "0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB",
        poolSecondType: "0x2::sui::SUI",
    },{ // 5: HIPPO
        name: "HIPPO",
        firstToken:{
          type: "0x8993129d72e733985f7f1a00396cbd055bad6f817fee36576ce483c8bbb8b87b::sudeng::SUDENG",
          decimal: 1000000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xb785e6eed355c1f8367c06d2b0cb9303ab167f8359a129bb003891ee54c6fce0",
        poolFirstType: "0x8993129d72e733985f7f1a00396cbd055bad6f817fee36576ce483c8bbb8b87b::sudeng::SUDENG",
        poolSecondType: "0x2::sui::SUI",
    },{ // 6: WUSDC
        name: "wUSDC",
        firstToken:{
          type: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
          decimal: 1000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630",
        poolFirstType: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
        poolSecondType: "0x2::sui::SUI",
    },{ // 7: WUSDT
        name: "wUSDT",
        firstToken:{
          type: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
          decimal: 1000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x06d8af9e6afd27262db436f0d37b304a041f710c3ea1fa4c3a9bab36b3569ad3",
        poolFirstType: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
        poolSecondType: "0x2::sui::SUI",
    },{ // 8: sbETH
        name: "sbETH",
        firstToken:{
          type: "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH",
          decimal: 100000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x7079378d20cb521acc9a77c0d69da0e4b65cc07b2a1666868c95444939c3929e",
        poolFirstType: "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH",
        poolSecondType: "0x2::sui::SUI",
    },{ // 9: FUD
        name: "FUD",
        firstToken:{
          type: "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
          decimal: 100000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xfc6a11998f1acf1dd55acb58acd7716564049cfd5fd95e754b0b4fe9444f4c9d",
        poolFirstType: "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
        poolSecondType: "0x2::sui::SUI",
    },{ // 10: sSUI
        name: "sSUI",
        firstToken:{
          type: "0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI",
          decimal: 1000000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x5c5e87f0adf458b77cc48e17a7b81a0e7bc2e9c6c609b67c0851ef059a866f3a",
        poolFirstType: "0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI",
        poolSecondType: "0x2::sui::SUI",
    },{ // 11: haSUI
        name: "haSUI",
        firstToken:{
          type: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
          decimal: 1000000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x871d8a227114f375170f149f7e9d45be822dd003eba225e83c05ac80828596bc",
        poolFirstType: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
        poolSecondType: "0x2::sui::SUI",
    },{ // 12: afSUI
        name: "afSUI",
        firstToken:{
          type: "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
          decimal: 1000000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0xa528b26eae41bcfca488a9feaa3dca614b2a1d9b9b5c78c256918ced051d4c50",
        poolFirstType: "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
        poolSecondType: "0x2::sui::SUI",
    },{ // 13: AUSD
        name: "AUSD",
        firstToken:{
          type: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
          decimal: 1000000,
          amount: 0,
        },
        secondToken: {
          type: "0x2::sui::SUI",
          decimal: 1000000000,
          amount: 0,
        },
        pool: "0x4811c1f0cc996e1b8f5befbf91fe4652bd6ff79115f09391ba157b21820fc9c0",
        poolFirstType: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
        poolSecondType: "0x2::sui::SUI",
    }
]


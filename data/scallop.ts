export const SCALLOP_VERSION = "0x07871c4b3c847a0f674510d4978d5cf6f960452795e8ff6f189fd2088a3f6ac7";
export const SCALLOP_MARKET = "0xa757975255146dc9686aa823b7838b507f315d704f428cbadad2f4ea061939d9";

export const SCALLOP_DEPOSIT=[
    { // 0 : SCA
        name: "SCA",
        inputType: "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA>",
    },{ // 1 : USDC
        name: "USDC",
        inputType: "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC>",
    },{ // 2 : SUI
        name: "SUI",
        inputType: "0x2::sui::SUI",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x2::sui::SUI>",
    },{ // 3 : wUSDC
        name: "wUSDC",
        inputType: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN>",
    },{ // 4 : wUSDT
        name: "wUSDT",
        inputType: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN>",
    },{ // 5 : sbETH
        name: "sbETH",
        inputType: "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH",
        inputAmount: 0,
        inputDecimal: 100000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH>",
    },{ // 6 : afSUI
        name: "afSUI",
        inputType: "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI>",
    },{ // 7 : haSUI
        name: "haSUI",
        inputType: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI>",
    }
];


export const SCALLOP_WITHDRAW = [
    { // 0 : SCA
        name: "SCA",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA>",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
    },{ // 1 : USDC
        name: "USDC",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC>",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
    },{ // 2 : SUI
        name: "SUI",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x2::sui::SUI>",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0x2::sui::SUI",
    },{ // 3 : wUSDC
        name: "wUSDC",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN>",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
    },{ // 4 : wUSDT
        name: "wUSDT",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN>",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
    },{ // 5 : sbETH
        name: "sbETH",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH>",
        inputAmount: 0,
        inputDecimal: 100000000,
        outputType: "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH",
    },{ // 6 : afSUI
        name: "afSUI",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI>",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
    },{ // 7 : haSUI
        name: "haSUI",
        inputType: "0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf::reserve::MarketCoin<0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI>",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
    }
];
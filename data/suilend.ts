export const SUILEND_LENDING_MARKET = "0x84030d26d85eaa7035084a057f2f11f701b7e2e4eda87551becbc7c97505ece1";
export const SUILEND_RESERVE_MAP: { [key: string]: number } = {
    "0x2::sui::SUI" : 0,
    "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD": 5,
    "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD": 6,
    "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP": 8,
    "0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI":10
};

export const SUILEND_PLATFORM_TYPE = "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL";

export const SUILEND_DEPOSIT=[
    { // 0: DEEP
        name: "DEEP",
        reserveIdx: 8,
        inputType: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP>",
    },{ // 1 : sSUI
        name: "sSUI",
        reserveIdx: 10,
        inputType: "0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI>",
    },{ // 2 : SUI
        name: "SUI",
        reserveIdx: 0,
        inputType: "0x2::sui::SUI",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x2::sui::SUI>",
    },{ // 3 : AUSD
        name: "AUSD",
        reserveIdx: 5,
        inputType: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD>",
    },{ // 4 : FUD
        name: "FUD",
        reserveIdx: 6,
        inputType: "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
        inputAmount: 100,
        inputDecimal: 100000,
        outputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD>",
    }


    
];

export const SUILEND_WITHDRAW = [
    { // 0: DEEP
        name: "DEEP",
        reserveIdx: 8,
        inputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP>",
        inputAmount: 0,
        inputDecimal: 1000000,
        outputType: "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
    },{ // 1 : sSUI
        name: "sSUI",
        reserveIdx: 10,
        inputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI>",
        inputAmount: 0,
        inputDecimal: 1000000000,
        outputType: "0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI",
    },{ // 2 : SUI
        name: "SUI",
        reserveIdx: 0,
        inputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x2::sui::SUI>",
        inputAmount: 0.0001,
        inputDecimal: 1000000000,
        outputType: "0x2::sui::SUI",
    },{ // 3 : AUSD
        name: "AUSD",
        reserveIdx: 5,
        inputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD>",
        inputAmount: 0.0001,
        inputDecimal: 1000000,
        outputType: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
    },{ // 4 : FUD
        name: "FUD",
        reserveIdx: 6,
        inputType: "0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::reserve::CToken<0xf95b06141ed4a174f239417323bde3f209b972f5930d8521ea38a52aff3a6ddf::suilend::MAIN_POOL,0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD>",
        inputAmount: 0.0001,
        inputDecimal: 100000,
        outputType: "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
    }
];
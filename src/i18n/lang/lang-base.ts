export type langType = {
  title: string;
  tabbar: {
    home: string;
    list: string;
    member: string;
  };
  language: {
    en: string;
    zh: string;
  };
  slogan: string;
  introduction: string;
  home: {
    api: string;
    share: string;
    exchange: string;
    help: string;
    support: string;
    cssMultiLanguage: string;
    tradeflow: string;
    shareinvite: string;
    apiset: string;
    helpcenter: string;
    market: string;
    instId: string;
    price: string;
    dayfl: string;
  };
  member: {
    setting: string;
    ws: string;
    wsinit: string;
    rest: string;
    person: string;
    email: string;
    password: string;
    contact: string;
    cache: string;
    version: string;
    wallet: string;
    charge: string;
    withdraw: string;
    analysis: string;
    manage: string;
    signal: string;
    language: string;
    todayProfit: string;
    monthProfit: string;
    accumulatedProfit: string;
    strategy: string;
    analyse: string;
    flow: string;
    hisStrategy: string;
    general: string;
  };
  list: {
    details: string;
    detail: string;
    stcreate: string;
    stparam: string;
    sthold: string;
    sthishold: string;
    kline: string;
    hisst: string;
    floatPL: string;
    hisstratety: string;
    oneKeyStart: string;
    his_backtest: string;
    currentStrategyCount: string;
    investment: string;
    backtestOnly: string;
    running: string;
    pausing: string;
    strategyFloatFL: string;
    pause: string;
    stop: string;
    proceed: string;
    backtest: string;
    todayProfit: string;
    accumulatedProfit: string;
    openQuantity: string;
    openCount: string;
    closeCount: string;
    maxLoss: string;
    startTime: string;
    duration: string;
    liqPx: string;
    orderPlan: string;
    strategyParam: string;
    holdOrder: string;
    hisOrder: string;
    config_api_first: string;
    get_api_error: string;
    refer_to_hisstrategy: string;
    force_close: string;
  };
  notice: {
    list: string;
    detail: string;
  };
  common: {
    num: string;
    from: string;
    to: string;
    captcha: string;
    send_captcha: string;
    has_send_captcha: string;
    input_captcha: string;
    empty_captcha: string;
    goto_login: string;
    save: string;
    cancel: string;
    confirm: string;
    nomore: string;
    operate_success: string;
    confirm_current_operation: string;
    input_keywords: string;
    save_success: string;
    start_success: string;
    empty_instId: string;
    get_price_error: string;
    get_lever_error: string;
  };
  login: {
    login: string;
    forget_password: string;
    register: string;
  };
  forget: {
    input_email: string;
    input_: string;
    input_password: string;
    reset_password: string;
  };
  register: {
    register: string;
    input_name: string;
    input_password: string;
    input_email: string;
    input_invitedCode: string;
    registered_to_login: string;
    reset_to_login: string;
  };

  tradeflow: {
    selectInstId: string;
    instId: string;
    openQuantity: string;
    openClosePrice: string;
    openCloseTime: string;
    profitAmount: string;
    open_time: string;
    close_time: string;
    get_instId_error: string;
  };
  shareInvite: {
    share: string;
  };
  apiset: {
    binance: string;
    okx: string;
    simulate: string;
    api_key: string;
    secret_key: string;
    passphrase: string;
    api_no_config: string;
    input_api_key: string;
    empty_api_key: string;
    input_secret_key: string;
    empty_secret_key: string;
    input_passphrase: string;
    empty_passphrase: string;
  };
  create_strategy: {
    base_param: string;
    type: string;
    name: string;
    tradeType: string;
    avaiBal: string;
    lever: string;
    modify_lever: string;
    direction: string;
    long: string;
    short: string;
    longshort: string;
    profitMode: string;
    priceArea: string;
    position: string;
    margin: string;
    addtion_count: string;
    profit_loss: string;
    profit_condition: string;
    traget_profit_rate: string;
    adjust_rate: string;
    loss_condition: string;
    loss_rate: string;
    controll: string;
    triggerCondition: string;
    triggerPrice: string;
    input_triggerPrice: string;
    loopMode: string;
    loop: string;
    onetime: string;
    closeStrategy: string;
    profit: string;
    loss: string;
    start_backtest: string;
    start_strategy: string;
    select_strategy_name: string;
    select_trade_type: string;
    select_instId: string;
    select_profit_mode: string;
    select_profit_condition: string;
    select_loss_condition: string;
    select_trigger_condition: string;
    backtest_period: string;
    confirm_operation: string;
    force_close: string;
    batch_profit: string;
    batch_loss: string;
    lowestOpenQuantity: string;
    quantity: string;
    addition_gap: string;
    stop_profit: string;
    adjust: string;
    stop_loss: string;
    long_position: string;
    short_position: string;
    empty_availBal: string;
    no_same_lever: string;
    get_availBal_error: string;
    get_instrument_error: string;
    get_lowest_open_quantity_error: string;
    get_par_value_error: string;
    empty_position: string;
    position_greatethen_availBal: string;
    empty_addition_count: string;
    empty_order_plan: string;
    empty_opencount_additiongap_profitrate: string;
    first_order_money: string;
    empty_first_order_money: string;
    fluctuation: string;
    quantity_serial: string;
  };
  strategy_name: {
    SimpleGrid: string;
    CustomGrid: string;
    LongShortHedgingGrid: string;
    TrendTrade: string;
    ReboundTrade: string;
  };
  tradeType: {
    SPOT: string;
    MARGIN: string;
    SWAPUSDT: string;
    SWAPCOIN: string;
  };
  type: {
    steady: string;
    radical: string;
  };
  direction: {
    opposite: string;
    trend: string;
  };
  profitMode: {
    single: string;
    entire: string;
  };
  triggerCondition: {
    price: string;
    immediately: string;
  };
  loopMode: {
    loop: string;
    onetime: string;
  };
  afterLoss: {
    continue_: string;
    stop: string;
  };
  profitCondition: {
    rate: string;
    gainThenFall: string;
  };
  lossCondition: {
    none: string;
    rate: string;
  };
  orderPlan: {
    openCount: string;
    openPrice: string;
  };
  holdOrder: {
    openTime: string;
  };
  hisOrder: {
    openQuantity: string;
    openClosePrice: string;
    openCloseTime: string;
    profitAmount: string;
  };
  setting: {
    person: string;
    email: string;
    password: string;
    language: string;
    cache: string;
    version: string;
    logout: string;
  };
  person: {
    avatar: string;
    nickname: string;
    name: string;
    input_name: string;
    input_nickname: string;
    empty_name: string;
  };
  email: {
    old_email: string;
    new_email: string;
    input_email: string;
  };
  password: {
    old_password: string;
    new_password: string;
    confirm_password: string;
    input_old_password: string;
    empty_old_password: string;
    input_new_password: string;
    empty_new_password: string;
    input_confirm_new_password: string;
    empty_confirm_new_password: string;
    no_same_input_password: string;
  };

  change_language: string;
  clear_cache: string;
  check_version: string;
  current_version: string;
  service: {
    title: string;
  };
  my_wallet: {
    totalAmount: string;
    chargeAmount: string;
    presentAmount: string;
    commissionAmount: string;
    charge: string;
    withdraw: string;
    charge_record: string;
    withdraw_record: string;
    consume_record: string;
    charge_time: string;
    charge_amount: string;
    withdraw_time: string;
    withdraw_amount: string;
    consume_time: string;
    consume_amount: string;
  };
};

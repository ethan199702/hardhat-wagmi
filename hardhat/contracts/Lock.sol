// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MyERC20 {
    /**
     * @dev 代币的名称，比如 "Ethereum"
     */
    string public name = "EthanToken";

    /**
     * @dev 代币的符号，比如 "ETH"
     */
    string public symbol = "ETBNB";
    /**
     * @dev 代币的小数位数，通常为 18，表示代币的最小单位精度。
     *      例如，如果 decimals 是 18，那么 1 个代币等于 10^18 个最小单位（wei）。
     */
    uint8 public decimals = 18;
    /**
     * @dev 代币的总供应量（totalSupply），表示整个代币系统中存在的代币总量。
     *      在合约构造时初始化，并在余额映射 `balances` 中分配给合约部署者。
     */
    uint public totalSupply;

    /**
     * @dev 记录每个地址的代币余额，`balances[地址] = 该地址的代币数量`
     */
    mapping(address => uint) private balances;

    /**
     * @dev 记录授权信息，存储某个地址对另一个地址的代币使用授权额度。
     *      `allowances[owner][spender] = 额度`
     *      例如：用户 A 授权用户 B 可支出 100 代币，则 `allowances[A][B] = 100`。
     */
    mapping(address => mapping(address => uint)) private allowances;

    /**
     * @dev 代币转账事件，在 `transfer` 和 `transferFrom` 函数中触发。
     * @param from 代币发送方
     * @param to 代币接收方
     * @param value 转账金额
     */
    event Transfer(address from, address to, uint value);
    /**
     * @dev 代币授权事件，在 `approve` 函数中触发。
     * @param owner 授权方
     * @param spender 被授权的地址
     * @param value 授权额度
     */
    event Approval(address owner, address spender, uint value);

    /**
     * @dev 合约的构造函数，在部署时执行。
     * @param initialSupply 代币的初始供应量（单位：整数，未乘以 `decimals`）。
     * @notice 代币的初始供应量会乘以 10^decimals 以符合标准单位。
     * @notice 初始供应量的所有代币都归合约的部署者所有。
     */
    constructor(uint initialSupply) {
        totalSupply = initialSupply * 10 ** uint(decimals);
        balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    /**
     * @dev 查询地址的余额
     */
    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }

    /**
     * @dev 进行代币转账。
     * @param to 接收代币的地址。
     * @param amount 转账的数量。
     * @return 成功返回 true，否则回滚交易。
     * @notice 发送方必须有足够的代币余额，否则交易会失败。
     * @notice `to` 不能是零地址。
     * @notice 触发 `Transfer` 事件。
     */
    function transfer(address to, uint amount) public returns (bool) {
        // 确保目标地址有效
        require(to != address(0), "Invalid address");
        // 检查余额是否充足
        require(balances[msg.sender] >= amount, "Insufficient balance");
        // 发送方减少余额
        balances[msg.sender] -= amount;
        // 接收方增加余额
        balances[to] += amount;
        // 触发 Transfer 事件
        emit Transfer(msg.sender, to, amount);

        return true;
    }

    /**
     * @dev 授权某个地址可以使用调用者的代币。
     * @param spender 被授权的地址。
     * @param amount 授权的额度。
     * @return 成功返回 true。
     * @notice 授权后，`spender` 可以使用 `transferFrom` 来代表 `msg.sender` 转账。
     * @notice 触发 `Approval` 事件。
     */
    function approve(address spender, uint amount) public returns (bool) {
        require(spender != address(0), "Invalid address");

        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    /**
     * @dev 查询授权额度，即某个地址被另一个地址允许支出的最大代币数量。
     * @param owner 代币持有者。
     * @param spender 被授权者。
     * @return 授权额度。
     */
    function allowance(
        address owner,
        address spender
    ) public view returns (uint256) {
        return allowances[owner][spender];
    }

    /**
     * @dev 代理转账（第三方代为执行转账）。
     * @param from 发送方（授权方）。
     * @param to 接收方。
     * @param amount 交易金额。
     * @return 成功返回 true，否则回滚交易。
     * @notice `from` 必须授权 `msg.sender` 足够的额度，否则交易失败。
     * @notice `from` 必须有足够的余额。
     * @notice 触发 `Transfer` 事件。
     */
    function transferFrom(
        address from,
        address to,
        uint amount
    ) public returns (bool) {
        require(to != address(0), "Invalid address");
        require(balances[from] >= amount, "Insufficient balance");
        require(allowances[from][msg.sender] >= amount, "Allowance exceeded");
        balances[msg.sender] -= amount;
        allowances[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);
        return true;
    }
}

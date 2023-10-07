// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;


contract BosMarketPlaceExample {

    address[] public users;
    address immutable public owner;
    uint256 public totalBalance;
    uint256 public nextUserId;
    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public userDataBalances;
    mapping(address => bool) public isAdmin;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    constructor(address _owner) {
        owner = _owner;
    }

    function addAdmin(address _admin) external onlyOwner {
        isAdmin[_admin] = true;
    }

    function addUser(address _user) external onlyOwner {
        users.push(_user);
    }

    function addMultipleUsers(address [] calldata _users) external onlyOwner {
        for (uint i = 0; i < _users.length; i++) {
            users.push(_users[i]);
            idToAddress[nextUserId] = _users[i];
            nextUserId++;
        }
    }


    function buyData(uint256 amount) external {
        require(amount > 0, "Invalid amount");
        userDataBalances[msg.sender] += amount;
        totalBalance += amount;
    }

    //------------------------------------GETTERS------------------------------------//

    function getUsers() external view returns (address[] memory) {
        return users;
    }

    function getUserById(uint256 _id) external view returns (address) {
        return idToAddress[_id];
    }

    function isUserAdmin(address _admin) external view returns (bool) {
        return isAdmin[_admin];
    }
}

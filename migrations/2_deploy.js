const Escrow = artifacts.require("Escrow");

module.exports = function (deployer) {
  deployer.deploy(Escrow,'0x7dDBd1043e3BAc36EF93eA0c3BaD3f1e6d2da48d','0x056a5316875774a03023436E1289CD3D2b6c7e90');
};


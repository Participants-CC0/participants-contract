// SPDX-License-Identifier: GPL-3.0
// Author: Modern People; Developed by Modern People, 2022
pragma solidity ^0.8.12;
import "./extensions/ERC721Enum.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "./ParticipantsRoyaltySplitter.sol";

contract Participants is ERC721Enum, Ownable, ReentrancyGuard, IERC2981 {
    using Strings for uint256;

    uint16 public constant MAX_SUPPLY = 3033;
    uint16 internal constant ROYALTY_BASE = 10000;
    uint16 internal constant ROYALTY_PERC = 1000;
    uint256 internal constant ZERO_ETHER = 0.00 ether;
    uint8 public constant MAX_PURCHASE_PER_TRANS = 1;
    uint8 public constant MAX_TOKEN_PER_WALLET = 1;

    bool public isMintingActive = false;
    string internal _baseTokenURI;
    address public participantsRoyaltyContract;

    // bytes4(keccak256("royaltyInfo(uint256,uint256)")) == 0x2a55205a
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address[] memory _recipients, //comm,mp,dd
        uint256[] memory _splits
    ) ERC721P(_name, _symbol) {
        setBaseURI(_initBaseURI);
        participantsRoyaltyContract = address(
            new ParticipantsRoyaltySplitter(_recipients, _splits)
        );
    }

    // internal
    function _baseURI() internal view virtual returns (string memory) {
        return _baseTokenURI;
    }

    // public minting
    function mint() public nonReentrant {
        require(isMintingActive, "Minting not active.");
        require(balanceOf(msg.sender) == 0, "Token amount exceeds per wallet.");

        uint256 _totalSupply = totalSupply();
        require(_totalSupply + 1 <= MAX_SUPPLY, "Sold Out");

        _safeMint(msg.sender, _totalSupply + 1, "");
        delete _totalSupply;
    }

    function reserve(uint256 _amount) public onlyOwner {
        require(_amount > 0);
        uint256 _totalSupply = totalSupply();
        for (uint256 i = 0; i < _amount; ++i) {
            _safeMint(msg.sender, _totalSupply + i, "");
        }
    }

    function royaltyInfo(uint256, uint256 _salePrice)
        public
        view
        override(IERC2981)
        returns (address receiver, uint256 royaltyAmount)
    {
        return (
            participantsRoyaltyContract,
            (_salePrice * ROYALTY_PERC) / ROYALTY_BASE
        );
    }

    // admin functionality

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "ERC721Metadata: Nonexistent token");
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        _baseTokenURI = _newBaseURI;
    }

    function setSaleStatus(bool _status) public onlyOwner {
        isMintingActive = _status;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enum, IERC165)
        returns (bool)
    {
        return
            interfaceId == _INTERFACE_ID_ERC2981 ||
            super.supportsInterface(interfaceId);
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}

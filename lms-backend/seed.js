
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Course = require('./models/Course');

dotenv.config();

const sampleCourses = [
  {
    title: 'Blockchain Fundamentals',
    description: 'A comprehensive introduction to the world of blockchain. This course covers the core concepts of decentralization, cryptographic hashing, consensus mechanisms, and the history of distributed ledger technology. Perfect for absolute beginners.',
    educator: 'Janice Mwita',
    lessons: [
      { id: '101', title: 'What is a Blockchain?', content: 'This lesson dives into the fundamental definition of a blockchain, exploring its structure as a distributed, immutable ledger. We will use simple analogies to understand blocks, chains, and decentralization.' },
      { id: '102', title: 'How Hashing Works', content: 'Cryptography is the backbone of blockchain security. This lesson explains what a cryptographic hash function is (specifically SHA-256) and how it creates a digital fingerprint for data, ensuring its integrity.' },
      { id: '103', title: 'Understanding Consensus', content: 'Learn about the different ways a decentralized network can agree on the state of the ledger. We will cover Proof of Work (PoW), as used in Bitcoin, and introduce the concept of Proof of Stake (PoS).' }
    ]
  },
  {
    title: 'Ethereum and Smart Contracts',
    description: 'Go beyond the basics and dive deep into the Ethereum ecosystem. This course focuses on the revolutionary concept of smart contracts, teaching you the Solidity programming language and how to build your first decentralized application (DApp).',
    educator: 'Alvin Gama',
    lessons: [
      { id: '201', title: 'The Ethereum Virtual Machine (EVM)', content: 'Discover what makes Ethereum a "world computer." This lesson explains the role of the EVM in executing smart contracts and maintaining the state of the network.' },
      { id: '202', title: 'Solidity Programming Basics', content: 'Get hands-on with Solidity, the primary language for Ethereum development. We will cover variables, functions, modifiers, and the basic structure of a smart contract file.' },
      { id: '203', title: 'Building Your First DApp', content: 'Combine your knowledge to build and deploy a simple decentralized application. This lesson walks you through connecting a frontend to your smart contract using libraries like Ethers.js.' }
    ]
  },
  {
    title: 'Advanced DeFi Analysis',
    description: 'Explore the cutting-edge world of Decentralized Finance (DeFi). This course is for those familiar with the basics of blockchain and want to understand how to analyze and interact with DeFi protocols like lending platforms, DEXs, and yield farming.',
    educator:'Betty Rose',
    lessons: [
      { id: '301', title: 'Intro to Decentralized Exchanges (DEXs)', content: 'Learn how automated market makers (AMMs) like Uniswap work. We will explore the concepts of liquidity pools, impermanent loss, and how to swap tokens without a central intermediary.' },
      { id: '302', title: 'Lending and Borrowing Protocols', content: 'Understand the mechanics behind DeFi lending platforms like Aave and Compound. This lesson covers over-collateralization, interest rate models, and flash loans.' },
      { id: '303', title: 'Yield Farming Strategies', content: 'Discover how users can put their crypto assets to work to generate passive income. We will explore various yield farming strategies, the risks involved, and how to analyze different opportunities.' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');
    await Course.deleteMany();
    console.log('Existing courses deleted.');
    await Course.insertMany(sampleCourses);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed(); 
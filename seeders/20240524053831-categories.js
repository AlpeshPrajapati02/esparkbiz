"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Books & Reference",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          name: "Business", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Comics", 
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        { 
          name: "Communication", 
          createdAt: new Date(), 
          updatedAt: new Date()
        },
        { name: "Education", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Entertainment", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Finance", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        {
          name: "Health & Fitness",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          name: "Lifestyle", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        {
          name: "Maps & Navigation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          name: "Music & Audio", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        {
          name: "News & Magazines",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Personalization",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          name: "Photography", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Productivity", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Shopping", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Social", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Sports", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        { 
          name: "Tools", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
        {
          name: "Travel & Local",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Video Players & Editors",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          name: "Weather", 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('categories', null, {});

  },
};

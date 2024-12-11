import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const GRAPHQL_API_URL = process.env.API_ENDPOINT;

// Webhook handler
const handleDialogflowWebhook = async (req, res) => {
  try {
    const userBudget = req.body.queryResult.parameters.budget;
    const userSize = req.body.queryResult.parameters.size;
    const userLocation = req.body.queryResult.parameters.location;
    const filter = {};
    if (userBudget) {
      filter.max_price = parseFloat(userBudget);
    }
    if (userSize) {
      filter.max_size = parseFloat(userSize);
    }
    if (userLocation) {
      filter.location = { city: userLocation };
    }

    // Query GraphQL
    const query = `
      query GetProperties($filter: PropertyFilterInput) {
        properties(filter: $filter) {
          id
          title
          price
          description
          size
          location {
            city
            district
            address
          }
        }
      }
    `;

    // Gửi yêu cầu tới API GraphQL
    const response = await axios.post(
      GRAPHQL_API_URL,
      { query, variables: { filter } },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { properties } = response.data.data;

    if (!properties || properties.length === 0) {
      return res.json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                'Xin lỗi, không tìm thấy bất động sản phù hợp với yêu cầu của bạn.'
              ]
            }
          }
        ]
      });
    }

    // Chuẩn bị danh sách kết quả
    const propertiesList = properties.map((property) => ({
      title: property.title,
      price: property.price,
      description: property.description,
      size: property.size,
      location: `${property.location.city}, ${property.location.district}, ${property.location.address}`
    }));

    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [
              'Đây là một số dự án anh/chị có thể quan tâm:',
              ...propertiesList.map(
                (property) =>
                  `${property.title} - Khu vực: ${property.location} - Giá: ${property.price} VND - Diện tích: ${property.size} m²`
              )
            ]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error calling GraphQL API:', error);
    return res.status(500).json({
      fulfillmentMessages: [
        {
          text: {
            text: ['Xin lỗi, có lỗi xảy ra khi lấy dữ liệu bất động sản.']
          }
        }
      ]
    });
  }
};

export default handleDialogflowWebhook;

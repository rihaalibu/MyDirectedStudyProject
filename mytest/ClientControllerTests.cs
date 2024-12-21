using HR_ClientManagement_WebAPI.Controllers;
using HR_ClientManagement_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using MockQueryable.Moq;
using Moq;
using Moq.EntityFrameworkCore;

namespace mytest
{
    public class ClientControllerTests
    {
        [Fact]
        public void Get_ReturnsExpectedValues()
        {
            var controller = new ClientController();
            var result = controller.Get();
            Assert.NotNull(result);
            Assert.Equal(new string[] { "value1", "value2" }, result);
        }

        [Fact]
        public void Get_ClientExists_ReturnsOkResult()
        {
            var mockContext = new Mock<HRAppDBContextClass>();
            int clientId = 3;
            var client = new ClientDBContextClass { ClientID = clientId, ClientName = "Test Client", ProjectID = 3 };
            mockContext.Setup(c => c.Clients).Returns(new List<ClientDBContextClass> { client }.AsQueryable().BuildMockDbSet().Object);
            var controller = new ClientController();
            var result = controller.Get(clientId, mockContext.Object);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(client, okResult.Value);
        }

        [Fact]
        public void Get_ClientExists_Returns404Result() 
        {
            var mockContext = new Mock<HRAppDBContextClass>();
            int nonExistedClientId = 99;
            mockContext.Setup(c => c.Clients).Returns(new List<ClientDBContextClass>().AsQueryable().BuildMockDbSet().Object);
            var controller = new ClientController();
            var result = controller.Get(nonExistedClientId, mockContext.Object);
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("404 - client not found", notFoundResult.Value);
        }

        [Fact]
        public void Post_ValidClient_ReturnsCreatedResult()
        {
            // Arrange
            var mockContext = new Mock<HRAppDBContextClass>();
            var mockDbSet = new Mock<DbSet<ClientDBContextClass>>();
            mockContext.Setup(c => c.Clients).Returns(mockDbSet.Object);

            var client = new ClientDBContextClass
            {
                ClientID = 1,
                ClientName = "New Client",
                ProjectID = 2
            };

            var controller = new ClientController();

            // Act
            var result = controller.Post(client, mockContext.Object);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(client, createdResult.Value); // Confirm client is included in response
            mockDbSet.Verify(c => c.Add(It.IsAny<ClientDBContextClass>()), Times.Once);
            mockContext.Verify(c => c.SaveChanges(), Times.Once);
        }


    }
}
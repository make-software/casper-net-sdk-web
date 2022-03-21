using Moq;
using NUnit.Framework;

namespace Casper.Network.SDK.Web.Test
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            var sseServiceMock = new Mock<ICasperSSEService>();
            Assert.Pass();
        }
    }
}
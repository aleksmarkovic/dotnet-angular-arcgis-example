using Microsoft.AspNetCore.Mvc;
using API.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private DataContext dataContext = new DataContext();


        // GET: <VehicleController>
        [HttpGet]
        public IEnumerable<Vehicle> Get()
        {
            return dataContext.Vehicles.Select(vehicle => vehicle).ToList();
        }

        // GET <VehicleController>/5
        [HttpGet("{id}")]
        public Vehicle Get(int id)
        {
            var result = dataContext.Vehicles.FirstOrDefault(vehicle => vehicle.Id == id);

            return result;
        }

        // POST <VehicleController>
        [HttpPost]
        public int Post([FromBody] Vehicle vehicle)
        {
            dataContext.Add(vehicle);
            dataContext.SaveChanges();

            return vehicle.Id;
        }

        // PUT <VehicleController>/id
        [HttpPut("{id}")]
        public void Put([FromBody] Vehicle vehicle)
        {
            Console.WriteLine(vehicle.AdditionalInfo);
            Console.WriteLine("vehicle");
            dataContext.Update(vehicle);
            dataContext.SaveChanges();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var vehicle = dataContext.Vehicles.FirstOrDefault(vehicle => vehicle.Id == id);

            if (vehicle != null)
            {
                dataContext.Vehicles.Remove(vehicle);
                dataContext.SaveChanges();
            }
        }
    }
}

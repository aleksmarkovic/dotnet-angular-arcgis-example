namespace API.Models
{
    public class VehicleRepository : IVehicleRepository
    {
        public void Add(Vehicle item)
        {
            Add(item);
        }

        public Vehicle Find(string key)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Vehicle> GetAll()
        {
            throw new NotImplementedException();
        }

        public Vehicle Remove(string key)
        {
            throw new NotImplementedException();
        }

        public void Update(Vehicle item)
        {
            throw new NotImplementedException();
        }
    }
}

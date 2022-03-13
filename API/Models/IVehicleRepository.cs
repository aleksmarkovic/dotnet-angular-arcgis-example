namespace API.Models
{
    public interface IVehicleRepository
    {
        void Add(Vehicle item);
        IEnumerable<Vehicle> GetAll();
        Vehicle Find(string key);
        Vehicle Remove(string key);
        void Update(Vehicle item);
    }
}

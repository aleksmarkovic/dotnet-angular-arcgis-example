using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DataContext context)
        {
            context.Database.EnsureCreated();

            // Look for any Vehicles.
            if (context.Vehicles.Any())
            {
                return;   // DB has been seeded
            }

            var Vehicles = new Vehicle[]
            {
            new Vehicle{Brand="Opel", Name="Astra", LongitudePosition=13.758, LatitudePosition=45.330, AdditionalInfo=""},
            new Vehicle{Brand="BMW", Name="X1", LongitudePosition=13.858, LatitudePosition=45.330, AdditionalInfo=""},
            new Vehicle{Brand="Renault", Name="Megane", LongitudePosition=13.758, LatitudePosition=45.430, AdditionalInfo=""},
            };
            foreach (Vehicle s in Vehicles)
            {
                context.Vehicles.Add(s);
            }
            context.SaveChanges();
        }
    }
}
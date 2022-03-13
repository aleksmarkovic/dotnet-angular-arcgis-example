namespace API.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Name { get; set; }
        public double LongitudePosition { get; set; }
        public double LatitudePosition { get; set; }
        public string AdditionalInfo { get; set; }
    }
}

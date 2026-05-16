namespace VMS.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Brand { get; set; } = "";
        public string Model { get; set; } = "";
        public int Year { get; set; }
        public double Price { get; set; }
        public int Mileage { get; set; }
        public string FuelType { get; set; } = "";
        public string Color { get; set; } = "";
        public string Description { get; set; } = "";
        public string SellerName { get; set; } = "";
        public string SellerPhone { get; set; } = "";
        public string ImageUrl { get; set; } = "";
    }
}
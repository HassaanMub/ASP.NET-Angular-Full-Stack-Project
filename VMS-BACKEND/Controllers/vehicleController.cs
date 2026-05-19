using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System;
using VMS.Models;

namespace VMS.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class VehiclesController : ControllerBase
    {
        private readonly string connectionString = "Data Source = Database/vehicles.db";
        [HttpGet]
        public List<Vehicle> GetVehicles()
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            using (SqliteConnection connection = new SqliteConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM Vehicles";
                SqliteCommand command = new SqliteCommand(query, connection);
                SqliteDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    Vehicle vehicle = new Vehicle
                    {
                        Id = reader.GetInt32(0),
                        Brand = reader.GetString(1),
                        Model = reader.GetString(2),
                        Year = reader.GetInt32(3),
                        Price = reader.GetDouble(4),
                        Mileage = reader.GetInt32(5),
                        FuelType = reader.GetString(6),
                        Color = reader.GetString(7),
                        Description = reader.GetString(8),
                        SellerName = reader.GetString(9),
                        SellerPhone = reader.GetString(10),
                        ImageUrl = reader.GetString(11),
                        SellerLocation = reader.GetString(12),
                        CreatedAt = DateTime.Parse(reader.GetString(13)),
                        UpdatedAt = DateTime.Parse(reader.GetString(14))
                    };
                    vehicles.Add(vehicle);
                }
                connection.Close();
            }
            return vehicles;
        }
        [HttpGet("{id}")]
        public Vehicle? GetVehicle(int id)
        {
            Vehicle? vehicle = null;
            using (SqliteConnection connection = new SqliteConnection(connectionString))
            {
                connection.Open();
                string query = "SELECT * FROM Vehicles WHERE Id = @id";
                SqliteCommand command = new SqliteCommand(query, connection);
                command.Parameters.AddWithValue("@id", id);
                SqliteDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    vehicle = new Vehicle
                    {
                        Id = reader.GetInt32(0),
                        Brand = reader.GetString(1),
                        Model = reader.GetString(2),
                        Year = reader.GetInt32(3),
                        Price = reader.GetDouble(4),
                        Mileage = reader.GetInt32(5),
                        FuelType = reader.GetString(6),
                        Color = reader.GetString(7),
                        Description = reader.GetString(8),
                        SellerName = reader.GetString(9),
                        SellerPhone = reader.GetString(10),
                        ImageUrl = reader.GetString(11),
                        SellerLocation = reader.GetString(12),
                        CreatedAt = DateTime.Parse(reader.GetString(13)),
                        UpdatedAt = DateTime.Parse(reader.GetString(14))
                    };
                }
                connection.Close();
            }
            return vehicle;
        }
        [HttpPost]
        public IActionResult AddVehicle(Vehicle vehicle)
        {
            using (SqliteConnection connection = new SqliteConnection(connectionString))
            {
                connection.Open();
                string query = @" INSERT INTO Vehicles 
                (Brand, Model, Year, Price, Mileage, FuelType, Color, Description, SellerName, SellerPhone, SellerLocation, ImageUrl, CreatedAt, UpdatedAt) 
                VALUES 
                (@Brand, @Model, @Year, @Price, @Mileage, @FuelType, @Color, @Description, @SellerName, @SellerPhone, @SellerLocation, @ImageUrl, @CreatedAt, @UpdatedAt)";
                SqliteCommand command = new SqliteCommand(query, connection);
                command.Parameters.AddWithValue("@Brand", vehicle.Brand);
                command.Parameters.AddWithValue("@Model", vehicle.Model);
                command.Parameters.AddWithValue("@Year", vehicle.Year);
                command.Parameters.AddWithValue("@Price", vehicle.Price);
                command.Parameters.AddWithValue("@Mileage", vehicle.Mileage);
                command.Parameters.AddWithValue("@FuelType", vehicle.FuelType);
                command.Parameters.AddWithValue("@Color", vehicle.Color);
                command.Parameters.AddWithValue("@Description", vehicle.Description);
                command.Parameters.AddWithValue("@SellerName", vehicle.SellerName);
                command.Parameters.AddWithValue("@SellerPhone", vehicle.SellerPhone);
                command.Parameters.AddWithValue("@SellerLocation", vehicle.SellerLocation);
                command.Parameters.AddWithValue("@ImageUrl", vehicle.ImageUrl);
                command.Parameters.AddWithValue("@CreatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                command.ExecuteNonQuery();
                connection.Close();
            }
            return Ok("Vehicle Added Successfully");
        }
        [HttpPut("{id}")]
        public IActionResult UpdateVehicle(int id, Vehicle vehicle)
        {
            using (SqliteConnection connection = new SqliteConnection(connectionString))
            {
                connection.Open();
                string query = @"
                UPDATE Vehicles
                SET 
                    Brand = @Brand,
                    Model = @Model,
                    Year = @Year,
                    Price = @Price,
                    Mileage = @Mileage,
                    FuelType = @FuelType,
                    Color = @Color,
                    Description = @Description,
                    SellerName = @SellerName,
                    SellerPhone = @SellerPhone,
                    SellerLocation = @SellerLocation,
                    ImageUrl = @ImageUrl,
                    UpdatedAt = @UpdatedAt
                WHERE Id = @Id";
                SqliteCommand command = new SqliteCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                command.Parameters.AddWithValue("@Brand", vehicle.Brand);
                command.Parameters.AddWithValue("@Model", vehicle.Model);
                command.Parameters.AddWithValue("@Year", vehicle.Year);
                command.Parameters.AddWithValue("@Price", vehicle.Price);
                command.Parameters.AddWithValue("@Mileage", vehicle.Mileage);
                command.Parameters.AddWithValue("@FuelType", vehicle.FuelType);
                command.Parameters.AddWithValue("@Color", vehicle.Color);
                command.Parameters.AddWithValue("@Description", vehicle.Description);
                command.Parameters.AddWithValue("@SellerName", vehicle.SellerName);
                command.Parameters.AddWithValue("@SellerPhone", vehicle.SellerPhone);
                command.Parameters.AddWithValue("@SellerLocation", vehicle.SellerLocation);
                command.Parameters.AddWithValue("@ImageUrl", vehicle.ImageUrl);
                command.Parameters.AddWithValue("@UpdatedAt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                command.ExecuteNonQuery();
                connection.Close();
            }
            return Ok("Vehicle Updated Successfully");
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle(int id)
        {
            using (SqliteConnection connection = new SqliteConnection(connectionString))
            {
                connection.Open();
                string query = "DELETE FROM Vehicles WHERE Id = @Id";
                SqliteCommand command = new SqliteCommand(query, connection);
                command.Parameters.AddWithValue("@Id", id);
                command.ExecuteNonQuery();
                connection.Close();
            }
            return Ok("Vehicle Deleted Successfully");
        }
    }
}
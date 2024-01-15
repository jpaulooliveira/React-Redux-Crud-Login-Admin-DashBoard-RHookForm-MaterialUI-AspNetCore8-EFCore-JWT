using SimpleCrudJwtAuthAspNet8WebAPI.Core.Dtos;


namespace SimpleCrudJwtAuthAspNet8WebAPI.Core.Interfaces
{

    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetProducts();
        Task<ProductDTO> GetProductById(int id);
        Task AddProduct(ProductDTO productDto);
        Task UpdateProduct(ProductDTO productDto);
        Task RemoveProduct(int id);
    }

}
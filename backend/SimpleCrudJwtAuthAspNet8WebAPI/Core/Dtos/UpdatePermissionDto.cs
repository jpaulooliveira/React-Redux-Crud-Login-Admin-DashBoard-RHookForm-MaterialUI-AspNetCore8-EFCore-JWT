using System.ComponentModel.DataAnnotations;

namespace SimpleCrudJwtAuthAspNet8WebAPI.Core.Dtos
{
    public class UpdatePermissionDto
    {
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; } 
      
    }
}

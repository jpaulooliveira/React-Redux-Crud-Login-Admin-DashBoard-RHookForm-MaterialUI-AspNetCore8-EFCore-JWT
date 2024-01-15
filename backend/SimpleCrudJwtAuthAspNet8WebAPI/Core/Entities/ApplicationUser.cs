using Microsoft.AspNetCore.Identity;

namespace SimpleCrudJwtAuthAspNet8WebAPI.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}

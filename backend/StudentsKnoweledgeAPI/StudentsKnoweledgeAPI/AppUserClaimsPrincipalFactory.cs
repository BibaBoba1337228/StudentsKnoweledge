using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using StudentsKnoweledgeAPI.Models;
using System.Security.Claims;

namespace StudentsKnoweledgeAPI
{
    public class AppUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<AppUser>
    {
        public AppUserClaimsPrincipalFactory(
            UserManager<AppUser> userManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, optionsAccessor)
        { }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(AppUser user)
        {
            var identity = await base.GenerateClaimsAsync(user);

            identity.AddClaim(new Claim(ClaimTypes.Role, user.Role.ToString()));

            return identity;
        }
    }
}

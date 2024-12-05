using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using System.Security.Claims;

namespace StudentsKnoweledgeAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MarksController: ControllerBase
    {

        private readonly AppDbContext _context;

        public MarksController(AppDbContext context)
        {
            _context = context;
        }





    }
}


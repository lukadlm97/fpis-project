using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PredlaganjeSaradnjeIRC.Data.Model;
using PredlaganjeSaradnjeIRC.Data.Service;

namespace PredlaganjeSaradnjeIRC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompany companyService;
        public CompanyController(ICompany companyService)
        {
            this.companyService = companyService;
        }

        [HttpGet]
        public async Task<ActionResult<Company>> GetCompanies()
        {
            var companies = companyService.GetAll();

            if (companies == null)
                return NotFound();

            return Ok(companies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = companyService.GetById(id);

            if (company == null)
                return NotFound();

            return Ok(company);
        }
    }
}
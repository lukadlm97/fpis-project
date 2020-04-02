﻿using System;
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
        [HttpPost]
        public async Task<ActionResult<Company>> AddNewCompany([FromBody] Company newCompany)
        {
            if (companyService.Add(newCompany))
            {
                // TODO: da se vraca kompanija koja je dodat kao objekat
                return Created("Kompanija je uspesno dodata!","");
            }
            return Forbid("Nemoguce uneti novu kompaniju!");
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Company>> UpdateCompany(int id,[FromBody] Company updatedCompany)
        {
            if (companyService.Update(updatedCompany))
            {
                return Ok("Kompanija je uspesno izmenjena!");
            }
            return Forbid("Nije moguce izmeniti kompaniju!");
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Company>> DeleteCompany(int id)
        {
            if (companyService.Delete(id))
            {
                return Ok("Kompanija je uspesno obrisana!");
            }
            return BadRequest("Kompaniju nije moguce obrisati!");
        }
        [HttpGet("{id}/contact")]
        public async Task<ActionResult<Contact>> GetContactsByCompany(int id)
        {

        }
    }
}
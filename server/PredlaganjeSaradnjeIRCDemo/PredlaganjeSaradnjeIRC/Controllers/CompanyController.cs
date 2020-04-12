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
        private readonly IContact contactService;
        private readonly ILocation locationService;
        private readonly ICity cityService;

        public CompanyController(ICompany companyService,IContact contactService,ILocation locationService,ICity cityService)
        {
            this.companyService = companyService;
            this.contactService = contactService;
            this.locationService = locationService;
            this.cityService = cityService;
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
            if (companyService.Update(id,updatedCompany))
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
        
        [HttpGet("contacts")]
        public async Task<ActionResult<Contact>> GetAllContacts()
        {
            var contacts = contactService.GetAll();

            if(contacts == null)
            {
                return NotFound("Nije moguce vratiti kontakte!");
            }

            return Ok(contacts);
        }

        [HttpGet("{id}/contact")]
        public async Task<ActionResult<Contact>> GetContactsForCompany(int id)
        {
            var contacts = contactService.GetAll(id);

            if (contacts == null)
            {
                return BadRequest("Nije moguce pronaci kontakte za zadatu kompaniju!");
            }
            return Ok(contacts);
        }
        
        [HttpPost("{id}/contact")]
        public async Task<ActionResult<Contact>> AddNewContact(int id,[FromBody] Contact contact)
        {
            if (companyService.AddNewContact(id,contact))
            {
                // TODO: da se vraca kontakt koji je dodat kao objekat
                return Created("Kontakt je uspesno dodat!", "");
            }
            return Forbid("Nemoguce uneti novi kontakt!");
        }
       
        [HttpDelete("{idCompany}/contact/{idContact}")]
        public async Task<ActionResult<Contact>> RemoveContact(int idCompany,int idContact)
        {
            if (contactService.Delete(idCompany, idContact))
            {
                return Ok("Kontakt je uspesno obrisana!");
            }
            return BadRequest("Kontakt je uspesno obrisana!");
        }
    
        [HttpPut("{idCompany}/contact/{idContact}")]
        public async Task<ActionResult<Contact>> UpdateContact(int idCompany,int idContact,[FromBody] Contact updatedContact)
        {
            if (contactService.Update(idCompany, idContact, updatedContact))
            {
                return Ok("Kontakt je uspesno izmenjen!");
            }
            return BadRequest("Nije moguce izmeniti kontakt!");
        }

        [HttpGet("{id}/location")]
        public async Task<ActionResult<Location>> GetLocationForCompany(int id)
        {
            var location = locationService.GetByCompanyId(id);

            if (location == null)
            {
                return NotFound("Nije nadjena lokacija za kompaniju");
            }

            return Ok(location);
        }

        [HttpPost("{id}/location")]
        public async Task<ActionResult<Location>> AddNewLocation(int id,[FromBody] Location newLocation)
        {
            if (locationService.Add(id, newLocation))
            {
                return Created("Uspesno ste dodali lokaciju za kompaniju","");
            }
            return BadRequest("Nije moguce uneti lokaciju za kompaniju");
        }

        [HttpGet("cities")]
        public async Task<ActionResult<City>> GetAllCities()
        {
            var cities = cityService.GetAll();

            if(cities == null)
            {
                return BadRequest("Nije moguce ucitati gradove");
            }

            return Ok(cities);
        }

    }
}
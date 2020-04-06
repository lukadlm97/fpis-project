using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PredlaganjeSaradnjeIRC.Data.Model;
using PredlaganjeSaradnjeIRC.Data.Service;
using PredlaganjeSaradnjeIRC.Services;

namespace PredlaganjeSaradnjeIRC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CooperationController : ControllerBase
    {
        private readonly IProspalForCooperation _cooperationService;

        public CooperationController(IProspalForCooperation cooperationService)
        {
            _cooperationService = cooperationService;
        }

        [HttpGet]
        public async Task<ActionResult<ProposalForCooperation>>  GetAllCooperations()
        {
            var prospals = _cooperationService
                                .GetAll();

            if(prospals == null)
            {
                return BadRequest("Nije moguce naci predloge!");
            }

            return Ok(prospals);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProposalForCooperation>> GetCooperationById(int id)
        {
            var prospal = _cooperationService.GetById(id);

            if(prospal == null)
            {
                return BadRequest("Nije moguce naci predlog!");
            }

            return Ok(prospal);
        }
    
        [HttpPost]
        public async Task<ActionResult<ProposalForCooperation>> AddNewCooperation([FromBody] ProposalForCooperation newProposal)
        {
            if (_cooperationService.Add(newProposal))
            {
                return Created("Predlog za saradnju uspesno kreiran", "Predlog za saradnju uspesno kreiran");
            }
            return Forbid("Nije moguce kreirati novi predlog za saradnju.");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProposalForCooperation>> UpdateProposal(int id,[FromBody] ProposalForCooperation proposalForUpdate)
        {
            if (_cooperationService.Update(id, proposalForUpdate))
            {
                return Ok("Predlog je uspesno izmenjen");
            }
            return Forbid("Predlog nije moguce izmeniti");
        }
    
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProposalForCooperation>> DeleteProposal(int id)
        {
            if (_cooperationService.Delete(id))
            {
                return Ok("Predog je uspesno obrisan.");
            }
            return BadRequest("Nije moguce obrisati predlog.");
        }

        [HttpPost("{id}/appendRequest")]
        public async Task<ActionResult<ProposalForCooperation>> AppendDescription(int id,[FromBody]string description)
        {
            if (_cooperationService.UpgradeDescription(id, description))
            {
                return Ok("Predlog je dopunjen!");
            }
            return BadRequest("Predlog nije moguce dopuniti!");
        }
    }
}
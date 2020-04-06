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
    }
}
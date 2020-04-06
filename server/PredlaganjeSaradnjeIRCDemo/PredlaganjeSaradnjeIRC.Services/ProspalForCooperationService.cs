using Microsoft.EntityFrameworkCore;
using PredlaganjeSaradnjeIRC.Data;
using PredlaganjeSaradnjeIRC.Data.Model;
using PredlaganjeSaradnjeIRC.Data.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Services
{
    public class ProspalForCooperationService:IProspalForCooperation
    {
        private readonly ApplicationContext _context;

        public ProspalForCooperationService(ApplicationContext context)
        {
            _context = context;
        }

        public bool Add(ProposalForCooperation newProposalForCooperation)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProposalForCooperation> GetAll()
        {
            return _context.ProposalForCooperations
                .Include(proposal => proposal.Company)
                    .ThenInclude(company => company.Contacts)
                .Include(proposal => proposal.Company)
                    .ThenInclude(company => company.Locations)
                .Include(proposal => proposal.Employee);
        }

        public ProposalForCooperation GetById(int id)
        {
            return GetAll().
                FirstOrDefault(proposal => proposal.Id == id);
        }

        public bool Update(ProposalForCooperation proposalForCooperation)
        {
            throw new NotImplementedException();
        }

        public bool UpgradeDescription(int id, string description)
        {
            throw new NotImplementedException();
        }
    }
}

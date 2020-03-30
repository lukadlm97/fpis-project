using PredlaganjeSaradnjeIRC.Data.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Data.Service
{
    public interface IProspalForCooperation
    {
        // main info about Propspal
        ProposalForCooperation GetById(int id);
        IEnumerable<ProposalForCooperation> GetAll();

        // CRUD operation 
        void Add(ProposalForCooperation newProposalForCooperation);
        void Delete(int id);
        void Update(ProposalForCooperation proposalForCooperation);

        // bonus operation
        void UpgradeDescription(int id, string description);
    }
}

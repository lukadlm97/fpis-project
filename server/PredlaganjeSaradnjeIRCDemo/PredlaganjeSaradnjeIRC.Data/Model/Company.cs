using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PredlaganjeSaradnjeIRC.Data.Model
{
    public class Company
    {
        [Required]
        public int Id { get; set; }
        public IEnumerable<Location> Locations { get; set; }
        public IEnumerable<ProposalForCooperation> ProposalForCooperations { get; set; }
        public List<Contact> Contacts  { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}

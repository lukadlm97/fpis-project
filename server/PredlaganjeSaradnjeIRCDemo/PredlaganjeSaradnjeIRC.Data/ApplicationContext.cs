﻿using Microsoft.EntityFrameworkCore;
using PredlaganjeSaradnjeIRC.Data.Model;
using System;

namespace PredlaganjeSaradnjeIRC.Data
{
    public class ApplicationContext:DbContext
    {
        public ApplicationContext()
        {

        }
        public ApplicationContext(DbContextOptions<ApplicationContext> options):base(options)
        {
        }

        public DbSet<ProposalForCooperation> ProposalForCooperations { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<AtPostion> AtPostions { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Contact> Contacts { get; set; }

    }
}

insert into roles(name) values('admin') ON CONFLICT (name) do nothing;
insert into roles(name) values('cs') ON CONFLICT (name) do nothing;

insert into grants(role, resource, action) values('admin', 'User', 'read:any') on conflict (role, resource, action) do nothing;
insert into grants(role, resource, action) values('admin', 'User', 'update:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('admin', 'FundingFiatDeposit', 'read:any') on conflict (role, resource, action) do nothing;
insert into grants(role, resource, action) values('admin', 'FundingFiatDeposit', 'update:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('admin', 'FundingFiatDepositHistory', 'read:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('admin', 'FundingFiatWithdrawal', 'read:any') on conflict (role, resource, action) do nothing;
insert into grants(role, resource, action) values('admin', 'FundingFiatWithdrawal', 'update:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('admin', 'FundingFiatWithdrawalHistory', 'read:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('admin', 'AdminUser', 'read:any') on conflict (role, resource, action) do nothing;


insert into grants(role, resource, action) values('cs', 'User', 'read:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('cs', 'FundingFiatDeposit', 'read:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('cs', 'FundingFiatDepositHistory', 'read:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('cs', 'FundingFiatWithdrawal', 'read:any') on conflict (role, resource, action) do nothing;

insert into grants(role, resource, action) values('cs', 'FundingFiatWithdrawalHistory', 'read:any') on conflict (role, resource, action) do nothing;

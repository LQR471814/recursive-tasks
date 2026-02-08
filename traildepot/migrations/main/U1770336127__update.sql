-- seed data
insert into task (
	id,
	name,
	comments,
	parent_id,
	assigned_to,
	timeframe_start,
	timescale,
	optimistic,
	expected,
	pessimistic,
	implementation
) values (
	X'019c3e8bea8d71ea91a23176498e8e38', -- id
	'Root', -- name
	'The root task which all tasks originate from.', -- comments
	X'019c3e8bea8d71ea91a23176498e8e38', -- parent_id
	null, -- assigned_to
	0, -- timeframe_start
	0, -- timescale
	100, -- optimistic
	100, -- expected
	100, -- pessimistic
	1 -- implementation
)
on conflict do nothing;

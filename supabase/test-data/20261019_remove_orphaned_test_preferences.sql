-- One-off: remove the two orphaned test rows (backed up to ~/nextflick-backups/).
-- Guarded: only these ids, and only if they have no matching public.users row.
delete from public.user_preferences
where id in (9, 34)
  and user_id not in (select id from public.users);

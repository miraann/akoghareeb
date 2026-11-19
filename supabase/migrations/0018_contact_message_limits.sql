-- ============================================================================
-- Size limits on contact messages
-- ============================================================================
-- contact_messages accepts inserts from anyone (the public contact form, and
-- also directly through the public Supabase API with the anon key), and every
-- new row triggers a push notification to the admins. Without limits a single
-- request could store megabytes of text or flood the admin's phone with huge
-- notifications. These match the checks in src/app/api/contact/route.ts.
--
-- NOT VALID: enforced for every new or updated row, without failing on any
-- older row that might already be longer.

alter table public.contact_messages
  drop constraint if exists contact_messages_name_length,
  drop constraint if exists contact_messages_phone_length,
  drop constraint if exists contact_messages_message_length;

alter table public.contact_messages
  add constraint contact_messages_name_length
    check (char_length(name) between 1 and 100) not valid,
  add constraint contact_messages_phone_length
    check (char_length(phone) between 7 and 30) not valid,
  add constraint contact_messages_message_length
    check (char_length(message) between 1 and 5000) not valid;

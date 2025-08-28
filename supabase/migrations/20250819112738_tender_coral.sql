/*
  # Create exams, subjects, and users tables

  1. New Tables
    - `exams`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text, optional)
      - `created_at` (timestamp)
    - `subjects`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `exam_id` (uuid, foreign key to exams)
      - `description` (text, optional)
      - `created_at` (timestamp)
    - `users`
      - `id` (uuid, primary key)
      - `phone` (text, unique, not null)
      - `name` (text, not null)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Add policies for users to manage their own data

  3. Sample Data
    - Insert sample exams (NEETPG, NEETUG, JEE)
    - Insert sample subjects for each exam
*/

-- Create exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  exam_id uuid NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for exams (public read access)
CREATE POLICY "Anyone can read exams"
  ON exams
  FOR SELECT
  TO public
  USING (true);

-- Create policies for subjects (public read access)
CREATE POLICY "Anyone can read subjects"
  ON subjects
  FOR SELECT
  TO public
  USING (true);

-- Create policies for users (users can read their own data)
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Insert sample exams
INSERT INTO exams (name, description) VALUES
  ('NEETPG', 'National Eligibility cum Entrance Test for Post Graduate'),
  ('NEETUG', 'National Eligibility cum Entrance Test for Under Graduate'),
  ('JEE Main', 'Joint Entrance Examination Main'),
  ('JEE Advanced', 'Joint Entrance Examination Advanced')
ON CONFLICT DO NOTHING;

-- Insert sample subjects for NEETPG
INSERT INTO subjects (name, exam_id, description)
SELECT 
  subject_name,
  (SELECT id FROM exams WHERE name = 'NEETPG' LIMIT 1),
  subject_desc
FROM (VALUES
  ('Anatomy', 'Human anatomy and physiology'),
  ('Physiology', 'Body functions and processes'),
  ('Biochemistry', 'Chemical processes in living organisms'),
  ('Pathology', 'Study of disease'),
  ('Pharmacology', 'Drug action and effects'),
  ('Microbiology', 'Study of microorganisms'),
  ('Forensic Medicine', 'Medical jurisprudence'),
  ('Community Medicine', 'Public health and preventive medicine'),
  ('Internal Medicine', 'Diagnosis and treatment of internal diseases'),
  ('Surgery', 'Surgical procedures and techniques'),
  ('Obstetrics & Gynecology', 'Women''s health and childbirth'),
  ('Pediatrics', 'Medical care of children'),
  ('Psychiatry', 'Mental health and disorders'),
  ('Dermatology', 'Skin diseases and conditions'),
  ('Ophthalmology', 'Eye diseases and vision'),
  ('ENT', 'Ear, nose, and throat disorders'),
  ('Orthopedics', 'Musculoskeletal system'),
  ('Radiology', 'Medical imaging and diagnosis')
) AS subjects_data(subject_name, subject_desc)
ON CONFLICT DO NOTHING;

-- Insert sample subjects for NEETUG
INSERT INTO subjects (name, exam_id, description)
SELECT 
  subject_name,
  (SELECT id FROM exams WHERE name = 'NEETUG' LIMIT 1),
  subject_desc
FROM (VALUES
  ('Physics', 'Fundamental principles of physics'),
  ('Chemistry', 'Chemical reactions and properties'),
  ('Biology', 'Living organisms and life processes'),
  ('Botany', 'Plant biology and structure'),
  ('Zoology', 'Animal biology and behavior')
) AS subjects_data(subject_name, subject_desc)
ON CONFLICT DO NOTHING;

-- Insert sample subjects for JEE Main
INSERT INTO subjects (name, exam_id, description)
SELECT 
  subject_name,
  (SELECT id FROM exams WHERE name = 'JEE Main' LIMIT 1),
  subject_desc
FROM (VALUES
  ('Physics', 'Mechanics, thermodynamics, and modern physics'),
  ('Chemistry', 'Organic, inorganic, and physical chemistry'),
  ('Mathematics', 'Algebra, calculus, and coordinate geometry')
) AS subjects_data(subject_name, subject_desc)
ON CONFLICT DO NOTHING;

-- Insert sample subjects for JEE Advanced
INSERT INTO subjects (name, exam_id, description)
SELECT 
  subject_name,
  (SELECT id FROM exams WHERE name = 'JEE Advanced' LIMIT 1),
  subject_desc
FROM (VALUES
  ('Physics', 'Advanced mechanics and quantum physics'),
  ('Chemistry', 'Advanced organic and inorganic chemistry'),
  ('Mathematics', 'Advanced calculus and analytical geometry')
) AS subjects_data(subject_name, subject_desc)
ON CONFLICT DO NOTHING;
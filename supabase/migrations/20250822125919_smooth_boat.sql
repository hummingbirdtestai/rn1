/*
  # Create student bookmarks table

  1. New Tables
    - `student_bookmarks`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key to users)
      - `content_text` (text, the bookmarked content)
      - `element_type` (text, type of element: mcq_option, summary, buzzword, etc.)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on student_bookmarks table
    - Add policy for users to manage their own bookmarks

  3. Indexes
    - Add index on student_id for faster queries
    - Add composite index on student_id + content_text for duplicate prevention
*/

-- Create student_bookmarks table
CREATE TABLE IF NOT EXISTS student_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_text text NOT NULL,
  element_type text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE student_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for student_bookmarks
CREATE POLICY "Users can read own bookmarks"
  ON student_bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = student_id::text);

CREATE POLICY "Users can insert own bookmarks"
  ON student_bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = student_id::text);

CREATE POLICY "Users can delete own bookmarks"
  ON student_bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = student_id::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_bookmarks_student_id 
  ON student_bookmarks(student_id);

CREATE INDEX IF NOT EXISTS idx_student_bookmarks_student_content 
  ON student_bookmarks(student_id, content_text);

CREATE INDEX IF NOT EXISTS idx_student_bookmarks_element_type 
  ON student_bookmarks(element_type);
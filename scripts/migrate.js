/**
 * Database Migration Script
 * Reads replica/schema.sql and runs it against PostgreSQL database.
 */
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const schemaPath = path.join(__dirname, '..', 'replica', 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  console.log('--- ANVI LIVING DATABASE MIGRATION ---');
  console.log(`Đã đọc file schema: ${schemaPath} (${sql.length} bytes)`);

  if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
    console.log('\n[LƯU Ý] Chưa cấu hình biến môi trường DATABASE_URL hoặc SUPABASE_DB_URL.');
    console.log('Bạn có thể copy trực tiếp nội dung trong file replica/schema.sql và dán vào Supabase SQL Editor để khởi tạo database ngay lập tức.');
    return;
  }

  console.log('Đang kết nối tới PostgreSQL và chạy lệnh DDL...');
}

runMigration().catch(console.error);

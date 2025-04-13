use tauri_plugin_sql::{Migration, MigrationKind};  

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
            kind: MigrationKind::Up,
        },
        // --- New Migration ---
        Migration {
            version: 2,
            description: "create_research_table",
            sql: "CREATE TABLE IF NOT EXISTS research (
                id TEXT PRIMARY KEY, 
                name TEXT NOT NULL, 
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
                deleted_at DATETIME
            );",
            kind: MigrationKind::Up,
        }
        // --- End New Migration ---
    ];
    
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:hivecite.db", migrations)
            .build()
        )
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

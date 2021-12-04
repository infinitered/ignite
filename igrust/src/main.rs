use structopt::StructOpt;
use std::{io, fs};
use std::path::{Path};

#[derive(StructOpt)]
struct Cli {
    /// The command
    command: String,
    /// The name of the app
    name: String,
}

fn main() {
    let args = Cli::from_args();

    println!("Hello, world!");
    println!("command: {}", args.command);
    eprintln!("name: {}", args.name);

    // convert name to pascal case
    let app_name = inflector::cases::pascalcase::to_pascal_case(&args.name);
    
    println!("name: {}", app_name);

    let pb = indicatif::ProgressBar::new(100);
    pb.inc(1);
    pb.finish_with_message("done");

    // remove the directry named app_name
    let _ = std::fs::remove_dir_all(&app_name);

    // make a new directory with app_name in the current directory
    let new_dir = std::path::Path::new(&app_name);
    
    // recursively get all files in the ../boilerplate directory
    let boilerplate_dir = std::path::Path::new("../boilerplate");
    copy_dir_all(boilerplate_dir, new_dir).unwrap();


}

fn copy_dir_all(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    fs::create_dir_all(&dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        if ty.is_dir() {
            copy_dir_all(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.as_ref().join(entry.file_name()))?;
        }
    }
    Ok(())
}

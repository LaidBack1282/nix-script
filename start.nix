{ pkgs ? import <nixpkgs> {} }:

pkgs.stdenv.mkDerivation {
  name = "program";
  nativeBuildInputs = [ pkgs.makeWrapper ];
  buildInputs = [ pkgs.nodejs ];

  phases = "installPhase";

  installPhase = ''
    mkdir -p $out/bin
    cp ${./main.js} $out/bin/program
    chmod +x $out/bin/program
    wrapProgram $out/bin/program --prefix PATH : ${pkgs.nodejs}/bin
  '';
}
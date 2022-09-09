{ pkgs }: {
	deps = [
		pkgs.wget
  pkgs.mkinitcpio-nfs-utils
  pkgs.toybox
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}
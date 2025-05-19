import os
import shutil
from pathlib import Path

def apply_layer(diff_path, target_root):
    for root, dirs, files in os.walk(diff_path):
        rel_path = os.path.relpath(root, diff_path)
        target_dir = os.path.join(target_root, rel_path)

        os.makedirs(target_dir, exist_ok=True)

        for fname in files:
            if fname.startswith(".wh."):
                # Handle whiteout (file deletion)
                removed = fname[4:]
                removed_path = os.path.join(target_dir, removed)
                if os.path.exists(removed_path):
                    print(f"Removing {removed_path} due to whiteout")
                    if os.path.isdir(removed_path):
                        shutil.rmtree(removed_path)
                    else:
                        os.remove(removed_path)
                continue

            src_file = os.path.join(root, fname)
            dst_file = os.path.join(target_dir, fname)

            # Copy file while preserving metadata
            if os.path.islink(src_file):
                linkto = os.readlink(src_file)
                os.symlink(linkto, dst_file)
            else:
                shutil.copy2(src_file, dst_file)

def rebuild_overlay2_image(top_layer_id, overlay_root, output_path):
    os.makedirs(output_path, exist_ok=True)

    visited = []

    # Stack lower dirs (bottom-up)
    layer_path = os.path.join(overlay_root, top_layer_id)
    lower_file = os.path.join(layer_path, "lower")

    if os.path.exists(lower_file):
        with open(lower_file, "r") as f:
            lower_layers = f.read().strip().split(":")
        visited.extend(lower_layers)

    visited.append(top_layer_id)  # top layer last

    print(f"Applying layers: {visited}")

    for layer in visited:
        diff_dir = os.path.join(overlay_root, layer, "diff")
        if os.path.exists(diff_dir):
            print(f"Applying layer {layer}")
            apply_layer(diff_dir, output_path)
        else:
            print(f"Warning: missing diff directory for layer {layer}")

# Example usage
if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Rebuild Docker overlay2 image filesystem")
    parser.add_argument("--layer-id", required=True, help="Topmost overlay2 layer ID")
    parser.add_argument("--overlay-root", default="/var/lib/docker/overlay2", help="Path to overlay2 root")
    parser.add_argument("--output", required=True, help="Output directory to reconstruct full filesystem")
    args = parser.parse_args()

    rebuild_overlay2_image(args.layer_id, args.overlay_root, args.output)

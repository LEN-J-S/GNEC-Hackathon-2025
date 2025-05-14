import subprocess
import webbrowser
import os
import sys
import shutil

def find_python():
    # Prefer sys.executable if bundled with Python
    if getattr(sys, 'frozen', False):
        return sys.executable
    
    # Fallback: try finding python in PATH
    python_in_path = shutil.which("python")
    if python_in_path:
        return python_in_path
    
    # Fallback: try python3
    python3_in_path = shutil.which("python3")
    if python3_in_path:
        return python3_in_path

    # Fail gracefully if no Python found
    raise EnvironmentError("Python interpreter not found in system PATH.")

def start_streamlit():
    python_exec = find_python()
    script_path = os.path.join("offline_chatbot", "app.py")
    subprocess.Popen([python_exec, "-m", "streamlit", "run", script_path, "--server.port", "8501"])
    webbrowser.open("http://localhost:8501")

if __name__ == "__main__":
    start_streamlit()

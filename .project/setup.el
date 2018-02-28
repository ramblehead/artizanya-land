;; -*- coding: utf-8 -*-

(let ((project-root (rh-project-get-root))
      file-rpath)
  (when project-root
    (setq file-rpath (file-relative-name buffer-file-name project-root))
    (cond ((string-match-p "src/.+\\.d\\.ts$" file-rpath) nil)
          ((string-match-p "src/.+\\.ts$" file-rpath)
           (rh-project-setup "ts-foxx")))))

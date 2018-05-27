# {{ page.name }} spec

{{#components}}
  ## {{name}} 

  Endpoints:
  {{#endpoints}}
    * {{name}}
  {{/endpoints}}

  Notes:
    {{#notes}}
    * {{text}}
    {{/notes}}
{{/components}}